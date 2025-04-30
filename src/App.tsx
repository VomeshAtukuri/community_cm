import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import OverviewPage from "./components/overview";
import Faq from "./components/faq";
function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTabClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  return (
    <>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="content_analysis" onClick={handleTabClick}>
            Content Analysis
          </TabsTrigger>
          <TabsTrigger value="search" onClick={handleTabClick}>
            Search
          </TabsTrigger>
          <TabsTrigger value="ai faqs" onClick={handleTabClick}>
            AI FAQS
          </TabsTrigger>
          <TabsTrigger value="spam" onClick={handleTabClick}>
            Spam Analysis
          </TabsTrigger>
          <TabsTrigger value="settings" onClick={handleTabClick}>
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewPage />
        </TabsContent>
        <TabsContent value="ai faqs">
          <Faq />
        </TabsContent>
      </Tabs>

      {dialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Work in Progress 🚧</h2>
            <p className="mb-6">
              This section is under development.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              <a
                href="https://community-monitor.ashysea-cd051f05.eastus.azurecontainerapps.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button onClick={() => setDialogOpen(false)}>Open in Admin panel</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

