class GetThreadUseCase {
  constructor({ threadRepository, commentRepository, likeRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._likeRepository = likeRepository;
  }

  async execute(useCasePayload) {
    const { threadId } = useCasePayload;
    await this._threadRepository.verifyThreadExists(threadId);
    const thread = await this._threadRepository.getThreadById(threadId);
    const comments = await this._commentRepository.getCommentsByThreadId(
      threadId
    );

    // Add like count to each comment
    const commentsWithLikes = await Promise.all(
      comments.map(async (comment) => {
        const likeCount = await this._likeRepository.getLikeCountByCommentId(
          comment.id
        );
        return {
          ...comment,
          likeCount,
        };
      })
    );

    return {
      ...thread,
      comments: commentsWithLikes,
    };
  }
}

module.exports = GetThreadUseCase;
