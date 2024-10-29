import React, { useState } from 'react';
import IssueForm from './IssueForm';
import IssueList from './IssueList';
import AdvocacyGroups from './AdvocacyGroups';
import PetitionSystem from './PetitionSystem';
import { Issue } from '../../types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

const RaiseIssuePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('raise');
  const [issues, setIssues] = useState<Issue[]>([]);

  const handleIssueSubmit = (newIssue: Omit<Issue, 'id' | 'status' | 'upvotes' | 'endorsements'>) => {
    const issueWithId: Issue = {
      ...newIssue,
      id: Date.now(),
      status: 'open',
      upvotes: 0,
      endorsements: [],
      createdAt: new Date().toISOString(),
    };
    setIssues(prev => [issueWithId, ...prev]);
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-6 text-saffron-800">Raise an Issue</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="raise">Raise Issue</TabsTrigger>
          <TabsTrigger value="explore">Explore Issues</TabsTrigger>
          <TabsTrigger value="advocacy">Advocacy Groups</TabsTrigger>
          <TabsTrigger value="petitions">Petitions</TabsTrigger>
        </TabsList>

        <TabsContent value="raise">
          <IssueForm onSubmit={handleIssueSubmit} />
        </TabsContent>

        <TabsContent value="explore">
          <IssueList issues={issues} setIssues={setIssues} />
        </TabsContent>

        <TabsContent value="advocacy">
          <AdvocacyGroups issues={issues} />
        </TabsContent>

        <TabsContent value="petitions">
          <PetitionSystem issues={issues} setIssues={setIssues} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RaiseIssuePage;