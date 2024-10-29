export interface Branch {
  id: string;
  name: string;
  type: 'branch' | 'division' | 'unit';
  location: string;
  head: string;
  parentId: string | null;
  children: Branch[];
}

export interface CustomRole {
  id: string;
  name: string;
  permissions: string[];
  branchId: string;
}

export interface Organization {
  id: string;
  name: string;
  handle: string;
  description: string;
  image: string;
  coverImage: string;
  followers: number;
  location: string;
  website: string;
  email: string;
  foundedDate: string;
}

export interface Collaboration {
  id: string;
  title: string;
  organizations: string[];
  description: string;
  type: 'project' | 'event' | 'resource';
  status: 'active' | 'pending' | 'completed';
}

export interface CollaborationMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  organizationId: string;
}