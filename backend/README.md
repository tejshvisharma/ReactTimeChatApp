backend/
└─ src/
   ├─ app.ts
   ├─ index.ts
   │
   ├─ config/
   │  ├─ env.ts
   │  ├─ database.ts
   │  └─ socket.ts
   │
   ├─ shared/
   │  ├─ errors/
   │  │  ├─ AppError.ts
   │  │  ├─ BadRequestError.ts
   │  │  ├─ UnauthorizedError.ts
   │  │  ├─ ForbiddenError.ts
   │  │  └─ NotFoundError.ts
   │  ├─ middleware/
   │  │  ├─ errorHandler.ts
   │  │  ├─ authMiddleware.ts
   │  │  └─ validateRequest.ts
   │  ├─ types/
   │  │  ├─ express.d.ts
   │  │  ├─ socket.d.ts
   │  │  └─ dto.ts
   │  ├─ utils/
   │  │  ├─ asyncHandler.ts
   │  │  ├─ pagination.ts
   │  │  └─ response.ts
   │  └─ constants/
   │     ├─ httpStatus.ts
   │     └─ socketEvents.ts
   │
   ├─ infrastructure/
   │  ├─ db/
   │  │  ├─ models/
   │  │  │  ├─ user.model.ts
   │  │  │  ├─ chat.model.ts
   │  │  │  └─ message.model.ts
   │  │  └─ repositories/
   │  │     ├─ user.repository.ts
   │  │     ├─ chat.repository.ts
   │  │     └─ message.repository.ts
   │  ├─ clerk/
   │  │  ├─ clerkClient.ts
   │  │  └─ clerkAuth.ts
   │  └─ logger/
   │     └─ logger.ts
   │
   ├─ modules/
   │  ├─ auth/
   │  │  ├─ auth.controller.ts
   │  │  ├─ auth.service.ts
   │  │  ├─ auth.routes.ts
   │  │  ├─ auth.validation.ts
   │  │  └─ auth.types.ts
   │  │
   │  ├─ users/
   │  │  ├─ user.controller.ts
   │  │  ├─ user.service.ts
   │  │  ├─ user.routes.ts
   │  │  ├─ user.validation.ts
   │  │  ├─ user.types.ts
   │  │  └─ user.mapper.ts
   │  │
   │  ├─ chats/
   │  │  ├─ chat.controller.ts
   │  │  ├─ chat.service.ts
   │  │  ├─ chat.routes.ts
   │  │  ├─ chat.validation.ts
   │  │  ├─ chat.types.ts
   │  │  └─ chat.mapper.ts
   │  │
   │  ├─ messages/
   │  │  ├─ message.controller.ts
   │  │  ├─ message.service.ts
   │  │  ├─ message.routes.ts
   │  │  ├─ message.validation.ts
   │  │  ├─ message.types.ts
   │  │  └─ message.mapper.ts
   │  │
   │  └─ presence/
   │     ├─ presence.service.ts
   │     ├─ presence.store.ts
   │     └─ presence.types.ts
   │
   ├─ sockets/
   │  ├─ socketServer.ts
   │  ├─ socketAuth.ts
   │  ├─ socketRooms.ts
   │  ├─ socketHandlers.ts
   │  ├─ socket.types.ts
   │  └─ events/
   │     ├─ chat.events.ts
   │     ├─ presence.events.ts
   │     └─ message.events.ts
   │
   └─ routes/
      └─ index.ts
