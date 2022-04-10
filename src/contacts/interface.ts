export interface Contact {
    name: string;
    type: string;
  }

  export interface ContactListReq {
    isDeleted: boolean;
    contactType?: string;
  }
