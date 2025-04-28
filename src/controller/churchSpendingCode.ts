import { Request, Response, Router } from "express";
import {
  createChurchSpendingCodeService,
  updateChurchSpendingCodeService,
  deleteChurchSpendingCodeService,
  getChurchSpendingCodeService,
  getAllChurchSpendingCodeService,
} from "../service/churchSpendingCode";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";

export const churchSpendingCodeRouter = Router();

churchSpendingCodeRouter.post(
  "/create",
  body("spendingCodeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const spendingCode = await createChurchSpendingCodeService(req.body);
      res.send(
        normalize(
          "Church spending code created successfully",
          "OK",
          DataType.object,
          spendingCode,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      console.log(error);
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

churchSpendingCodeRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("spendingCodeName").isString().trim(),
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
      const spendingType = await updateChurchSpendingCodeService(id, req.body);
      console.log(`UPDATE_INCOME_CTRL`, spendingType);
      res.send(
        normalize(
          "Church Spending Code updated successfully",
          "OK",
          DataType.object,
          spendingType,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

churchSpendingCodeRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteChurchSpendingCodeService(id);
      res
        .status(200)
        .json(
          normalize(
            "Church Spending Code deleted successfully",
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

churchSpendingCodeRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const spendingCode = await getChurchSpendingCodeService(id);
      if (spendingCode) {
        res.send(
          normalize(
            "Church Spending Code Detail found successfully",
            "OK",
            DataType.object,
            spendingCode,
          ),
        );
      } else {
        res
          .status(404)
          .json(
            normalize(
              "Church Spending Code not found",
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

churchSpendingCodeRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const spendingCode = await getAllChurchSpendingCodeService();
    res.send(
      normalize(
        "Church Spending Code found successfully.",
        "OK",
        DataType.array,
        {
          spendingCode,
        },
      ),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});
