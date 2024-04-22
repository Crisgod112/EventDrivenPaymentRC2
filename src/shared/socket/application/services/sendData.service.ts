import { QueueContent } from "../../../broker/domain/entities";
import { EventsSocket } from "../../domain/entities/event.types";
import { SocketRepository } from "../../domain/repositories/socketRepository";

export class SendDataService {
  constructor(private readonly socketRepository: SocketRepository) {}
  async run(eventEmit: EventsSocket, data: QueueContent) {
    try {
      const response2 = await this.socketRepository.sendOrder(eventEmit, data);
      console.log(response2);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
