import{
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm'
  
  @Entity()
  export class UserSession {
    @PrimaryColumn()
    sessionId!: string
  
    @Column({nullable: true})
    userId?: string
  
    @Column()
    accessToken!: string
  
    @Column()
    refreshToken!: string
  
    @Column()
    sessionExpiry!: Date

    @Column()
    accessTokenExpiry!: Date
  
    @CreateDateColumn()
    createdAt!: Date
  
    @Column()
    lastLogin!: Date
  }