import { Response, Request } from "express";
import { CreatePaymentService } from "../../application/services/createPayment.service";

export class CreatePaymentController {
  constructor(private readonly createPaymentService: CreatePaymentService) {}
  async run(req: Request, res: Response) {
    try {
      const order = req.body;
      await this.createPaymentService.run(order);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
