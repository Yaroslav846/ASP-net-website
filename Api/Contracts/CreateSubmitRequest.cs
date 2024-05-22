namespace Api.Contracts
{
    public record CreateSubmitRequest(string Name, string Phone, string Email, object[] Questions);
}