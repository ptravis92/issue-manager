export interface Issue {
    _id: string;
    issue_title: string;
    issue_text: string;
    created_on: string;
    updated_on: string;
    created_by: string;
    assigned_to: string;
    open: boolean;
    status_text: string;
}
