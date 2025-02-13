export interface User {
    _id: string;
    email: string;
    name: string;
}

export interface CreateInfluencerModalProps {
    onClose: () => void;
}

export interface Campaign {
    _id: string;
    name: string;
    status: string;
    deadline: Date;
}

export interface Influencer {
    _id: string;
    name: string;
    user: string;
    joinedCampaigns: string[];
}

export interface JwtPayload {
    exp: number;
    sub: string;
    email: string;
}

// submissions
export interface Submission {
    _id: string;
    influencer: string;
    campaign: string;
    submissionDate: Date;
    status: string;
    content: string;
}
export interface SubmissionTableProps {
    data: Submission[];
    onEdit: (submissionId: string) => void;
    onDelete: (submissionId: string) => void;
    onApprove: (submissionId: string) => void;
    onReject: (submissionId: string) => void;
}