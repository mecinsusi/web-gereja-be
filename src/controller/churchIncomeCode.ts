import { Request, Response, Router } from "express";
import {
  createChurchIncomeCodeService,
  updateChurchIncomeCodeService,
  deleteChurchIncomeCodeService,
  getChurchIncomeCodeService,
  getAllChurchIncomeCodeService,
} from "../service/churchIncomeCode";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const churchIncomeCodeRouter = Router();

churchIncomeCodeRouter.post(
  "/create",
  body("incomeCodeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const incomeCode = await createChurchIncomeCodeService(req.body);
      res.send(
        normalize(
          "Church income code created successfully",
          "OK",
          DataType.object,
          incomeCode,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      console.log(error);
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

churchIncomeCodeRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("incomeCodeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    console.log(`REQ_BODY_UPDATE_INCOME`, req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const incomeCode = await updateChurchIncomeCodeService(id, req.body);
      console.log(`UPDATE_INCOME_CTRL`, incomeCode);
      res.send(
        normalize(
          "Church Income Code updated successfully",
          "OK",
          DataType.object,
          incomeCode,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

churchIncomeCodeRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteChurchIncomeCodeService(id);
      res
        .status(200)
        .json(
          normalize(
            "Church IncomeCode deleted successfully",
            "OK",
            DataType.null,
            null,
          ),
        );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

churchIncomeCodeRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const incomeCode = await getChurchIncomeCodeService(id);
      if (incomeCode) {
        res.send(
          normalize(
            "Church Income Code Detail found successfully",
            "OK",
            DataType.object,
            incomeCode,
          ),
        );
      } else {
        res
          .status(404)
          .json(
            normalize(
              "Church IncomeCode not found",
              "ERROR",
              DataType.null,
              null,
            ),
          );
      }
    } catch (error) {
      console.log(`ERROR_`, error);
      const message = (error as any)?.message || "Internal server error";
      res.status(500).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

churchIncomeCodeRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const incomeCode = await getAllChurchIncomeCodeService();
    res.send(
      normalize(
        "Church Income Code found successfully.",
        "OK",
        DataType.object,
        {
          incomeCode,
        },
      ),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});
