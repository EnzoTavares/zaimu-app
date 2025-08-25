export type User = {
    userId?: number;
    uuid: string;
    email: string;
    givenName: string;
    familyName: string;
    nickname: string;
    dateCreated?: string;
    dateUpdated?: string;
    dateLastLogin?: string;
    idCustomization?: number;
    profilePicUrl?: string;
    status?: string;
}