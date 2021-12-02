import { EntityRepository, Repository } from "typeorm";
import { VerificationNotification } from "./entities/verification-notification.entity";

@EntityRepository(VerificationNotification)
export class VerificationNotificationRepository extends Repository<VerificationNotification> {}
