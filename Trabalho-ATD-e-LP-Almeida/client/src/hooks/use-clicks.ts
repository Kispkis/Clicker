import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ClickInput, type ClickResponse } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateClick() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ClickInput) => {
      const res = await fetch(api.clicks.create.path, {
        method: api.clicks.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Invalid request");
        }
        throw new Error("Failed to register click");
      }

      return api.clicks.create.responses[201].parse(await res.json());
    },
    onSuccess: (data) => {
      // We don't strictly need to invalidate anything if we just append to a local list,
      // but if we had a "Today's Clicks" history endpoint, we would invalidate it here.
      // For now, we return the data so the UI can update immediately.
      toast({
        title: "Click Registered",
        description: `Sequence #${data.sequence} recorded at ${data.time}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
