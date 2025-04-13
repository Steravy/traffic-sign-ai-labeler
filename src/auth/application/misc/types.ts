
enum Status {
    ACTIVE = "active",
    DISABLED = "disabled"
};

enum UserType {
    DEVELOPER = "developer",
    COMPANY = "company",
    STUDENT = "student"
};

type ApiKeyData = {
    owner: string;
    key: string;
    email: string;
    userType: UserType;
};


export {
    Status,
    UserType,
    ApiKeyData,

}