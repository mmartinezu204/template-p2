import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditorioEntity } from './auditorio.entity/auditorio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuditorioService {
    constructor(
            @InjectRepository(AuditorioEntity)
            private readonly auditorioRepository: Repository<AuditorioEntity>
        ) {}
    
        async crearAuditorio(auditorio: AuditorioEntity): Promise<AuditorioEntity> {
           return await this.auditorioRepository.save(auditorio);
       }
    
}
