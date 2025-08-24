class LikeCommentUseCase {
  constructor({ likeRepository, commentRepository, threadRepository }) {
    this._likeRepository = likeRepository;
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload, credentialId) {
    const { threadId, commentId } = useCasePayload;

    await this._threadRepository.verifyThreadExists(threadId);
    await this._commentRepository.verifyCommentExists(commentId);

    const isLiked = await this._likeRepository.verifyLikeExists(
      credentialId,
      commentId
    );

    if (isLiked) {
      await this._likeRepository.deleteLike(credentialId, commentId);
    } else {
      await this._likeRepository.addLike(credentialId, commentId);
    }
  }
}

module.exports = LikeCommentUseCase;
