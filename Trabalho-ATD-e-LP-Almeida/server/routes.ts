
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.clicks.create.path, async (req, res) => {
    try {
      const input = api.clicks.create.input.parse(req.body);
      const click = await storage.createClick(input);
      
      // Format date and time for the user
      // "o número sequencial do clique, a data, a hora e os minutos do clique"
      const dateStr = format(click.clickedAt, 'dd/MM/yyyy');
      const timeStr = format(click.clickedAt, 'HH:mm');

      res.status(201).json({
        sequence: click.sequenceNumber,
        date: dateStr,
        time: timeStr,
        buttonLabel: click.buttonLabel
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.clicks.listToday.path, async (req, res) => {
    const todaysClicks = await storage.getTodaysClicks();
    res.json(todaysClicks);
  });

  return httpServer;
}
