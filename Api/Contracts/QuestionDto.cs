namespace Api.Contracts;

public record QuestionDto(Guid Id, string Name, string Email , string Phone, DateTime CreatedAt, string QuestionAnswersJson);