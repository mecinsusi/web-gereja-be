import { Request, Response, Router } from "express";
import {
  createChurchSpendingService,
  updateChurchSpendingService,
  patchChurchSpendingService,
  deleteChurchSpendingService,
  getChurchSpendingService,
  getAllChurchSpendingService,
} from "../service/churchSpending";

import { body, param, validationResult } from "express-validator";
import { normalize } from "../utils/normalize";
import { DataType } from "../types/dataType";
import multer from "multer";
const upload = multer({ dest: "../../uploads/" });

export const churchSpendingRouter = Router();

churchSpendingRouter.post(
  "/create",
  upload.single("bill"),
  body("detail").isString().trim(),
  body("funds").isInt(),
  body("billNumber").isString().trim(),
  body("spendingCodeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  body("date").isISO8601(),
  body("fundsType").optional().isIn(["CHURCH", "STORE", "FARM"]),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const fileName = req.file?.filename || null;

      const payload = {
        ...req.body,
        bill: fileName, // ganti dari blob ke filename
        funds: parseInt(req.body.funds),
      };

      const spending = await createChurchSpendingService(payload);

      res.send(
        normalize(
          "Church spending created successfully",
          "OK",
          DataType.object,
          spending,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      console.log(error);
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

churchSpendingRouter.put(
  "/update/:id",
  param("id").isNumeric().trim(),
  body("detail").isString().trim(),
  body("funds").isInt(),
  body("bill").isString().trim(),
  body("billNumber").isString().trim(),
  body("spendingCodeName").isString().trim(),
  body("description").isString().trim(),
  body("code").isString().trim(),
  body("date").isISO8601(),
  body("fundsType").optional().isIn(["CHURCH", "STORE", "FARM"]),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    console.log(`REQ_BODY_UPDATE_SPENDING`, req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const spending = await updateChurchSpendingService(id, req.body);
      console.log(`UPDATE_SPENDING_CTRL`, spending);
      res.send(
        normalize(
          "Church Spending updated successfully",
          "OK",
          DataType.object,
          spending,
        ),
      );
    } catch (error) {
      const message = (error as any)?.message || "Internal server error";
      res.status(400).json(normalize(message, "ERROR", DataType.null, null));
    }
  },
);

churchSpendingRouter.patch(
  "/:id",
  param("id").isNumeric().trim(),
  body("op").isIn(["add", "remove", "replace"]),
  body("path").isString().trim(),
  body("value").optional().isString().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const inventory = await patchChurchSpendingService(id, req.body);
      res.send(inventory);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal service error" });
    }
  },
);

churchSpendingRouter.delete(
  "/delete/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      await deleteChurchSpendingService(id);
      res
        .status(200)
        .json(
          normalize(
            "Church Spending deleted successfully",
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

churchSpendingRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const spending = await getAllChurchSpendingService();
    res.send(
      normalize("Church Spending found successfully.", "OK", DataType.array, {
        spending,
      }),
    );
  } catch (error) {
    const message = (error as any)?.message || "Internal server error";
    res.status(400).json(normalize(message, "ERROR", DataType.null, null));
  }
});

churchSpendingRouter.get(
  "/:id",
  param("id").isNumeric().trim(),
  async (req: Request, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = BigInt(req.params.id);
    try {
      const spending = await getChurchSpendingService(id);
      if (spending) {
        res.send(
          normalize(
            "Church Spending Detail found successfully",
            "OK",
            DataType.object,
            spending,
          ),
        );
      } else {
        res
          .status(404)
          .json(
            normalize(
              "Church Spending not found",
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
