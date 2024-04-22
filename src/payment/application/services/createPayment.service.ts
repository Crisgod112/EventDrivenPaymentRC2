import { SendMessageService } from "../../../shared/broker/application/services/sendMessage.service";
import {
  QueueName,
} from "../../../shared/broker/domain/entities";
import { SendDataService } from "../../../shared/socket/application/services/sendData.service";
import { EventsSocket } from "../../../shared/socket/domain/entities/event.types";

function generarNumeroAleatorio(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export class CreatePaymentService {
  constructor(
    private readonly sendMessageService: SendMessageService,
    private readonly sendOrderService: SendDataService
  ) {}
  async run(order: any): Promise<void> {
    try {
      const numeroAleatorio = generarNumeroAleatorio(0, 100);

      const payment = {
        noti: `Haz Realisado con éxtio la compra de La OrdeN: ${order?.name} con la descripcion: ${order?.description} y un precio de $ ${numeroAleatorio} `,
        ...order,
      };
      await this.sendMessageService.run(payment, QueueName.APP_PAYMENT);
      const response2 = await this.sendOrderService.run(EventsSocket.SEND_ORDER, payment);
      console.log(response2);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
