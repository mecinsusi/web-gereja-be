import { Request, Response, Router } from "express";
import { getFinanceReport } from "../service/finance";

export const financeRouter = Router();

financeRouter.get("/", async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  try {
    const report = await getFinanceReport(
      startDate as string | undefined,
      endDate as string | undefined,
    );

    res.status(200).json({
      meta: {
        message: "Finance report fetched successfully",
        status: "OK",
        dataType: "object",
      },
      data: report,
    });
  } catch (error: any) {
    res.status(500).json({
      meta: {
        message: "Internal server error",
        status: "ERROR",
      },
      error: error.message,
    });
  }
});
