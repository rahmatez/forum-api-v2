# ACTION PLAN - Meningkatkan Test Coverage ke 100%

## Current Status: 28.51% Coverage

## Target Areas untuk Testing:

### 1. Use Cases (Priority HIGH) - Current: 17.02%
- [ ] AddCommentUseCase.test.js
- [ ] AddThreadUseCase.test.js  
- [ ] DeleteCommentUseCase.test.js
- [ ] GetThreadUseCase.test.js
- [ ] LikeCommentUseCase.test.js
- [ ] LoginUserUseCase.test.js
- [ ] LogoutUserUseCase.test.js
- [ ] RefreshAuthenticationUseCase.test.js

### 2. Repository Classes (Priority HIGH) - Current: 0%
- [ ] AuthenticationRepositoryPostgres.test.js
- [ ] CommentRepositoryPostgres.test.js
- [ ] LikeRepositoryPostgres.test.js
- [ ] ThreadRepositoryPostgres.test.js
- [ ] UserRepositoryPostgres.test.js

### 3. Functional Tests (Priority MEDIUM)
- [ ] ThreadsHandler functional tests
- [ ] CommentsHandler functional tests  
- [ ] AuthenticationsHandler functional tests
- [ ] UsersHandler functional tests

### 4. Domain Entities (Priority LOW) - Current: ~50%
- [ ] Complete AddedComment.test.js
- [ ] Complete NewComment.test.js
- [ ] Complete AddedThread.test.js
- [ ] Complete RegisteredUser.test.js

## Commands to Run:
```bash
# Create test files
npm run test -- --coverage --verbose
npm run test:watch

# Target: 100% coverage
```

## Timeline: 1-2 days for complete coverage
