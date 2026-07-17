import { Router } from "express";
import * as nomineeController from "../controllers/nominee.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import { createNomineeSchema, updateNomineeSchema
} from "../validators/nominee.validator.js";

const router = Router();

router.post( "/", protect, validate(createNomineeSchema), nomineeController.createNominee
);

router.get( "/", protect, nomineeController.getNominees
);

router.get( "/:id", protect, nomineeController.getNomineeById
);

router.put( "/:id", protect, validate(updateNomineeSchema), nomineeController.updateNominee
);

router.delete( "/:id", protect, nomineeController.deleteNominee
);

export default router;