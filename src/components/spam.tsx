import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle,
  MailQuestion,
  Loader2,
  X,
  Info,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mocked session values
const sessionId = "mock-session-id";
const domain = "mock-domain";
const id = "123";

const Spam: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [results, setResults] = useState<{
    totalmsgs: number;
    spam: number;
    notspam: number;
    spammsg: { subject: string; body: string }[];
  } | null>(null);

  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState<string>("");

  const discussionStyles = ["forum", "idea", "contest", "review"];

  useEffect(() => {
    if (!sessionId || !domain || !category) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            category,
            session_id: sessionId,
            domain,
            userKeywords: keywords,
          }),
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(
            errorMessage?.message ||
              `Failed to fetch messages (${response.status})`
          );
        }

        const data = await response.json();
        if (!data.results) throw new Error("Invalid response structure");

        setResults(data.results);
      } catch (error: any) {
        setError(error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, category, keywords]);

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((k) => k !== keywordToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <>
      <div className="rounded-lg shadow-sm p-2 mb-6">
        <div className="space-y-6">
          {/* Keywords */}
          <div className="p-2 rounded-lg">
            <div className="flex items-center p-2">
              <h2 className="text-lg font-medium">Keywords for Spam Detection</h2>
              <HoverCard>
                <HoverCardTrigger>
                  <Info className="h-4 w-4 ml-2" />
                </HoverCardTrigger>
                <HoverCardContent className="p-2 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    Add keywords to help improve spam detection accuracy.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>

            <div className="flex space-x-2">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder="Enter keyword"
                className="flex-1"
              />
              <Button onClick={addKeyword}>Add</Button>
            </div>

            <div className="mt-4">
              {keywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="ml-2 text-primary/70 hover:text-primary"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No keywords added yet.
                </p>
              )}
            </div>
          </div>

          {/* Select category */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-sm font-medium">Select Discussion Style:</p>
            <Select onValueChange={setCategory} value={category || undefined}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Choose style" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {discussionStyles.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <AlertCircle className="h-10 w-10 text-destructive mb-4" />
            <p className="text-destructive font-medium">{error}</p>
          </div>
        </div>
      ) : results ? (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Total */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                <MailQuestion className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{results.totalmsgs}</div>
              </CardContent>
            </Card>

            {/* Spam */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Spam</CardTitle>
                <AlertCircle className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{results.spam}</div>
              </CardContent>
            </Card>

            {/* Not Spam */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Non-Spam</CardTitle>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{results.notspam}</div>
              </CardContent>
            </Card>
          </div>

          {/* Spam messages */}
          {results.spammsg.length > 0 && (
            <div>
              <h2 className="text-lg font-medium mb-4">Detected Spam Messages</h2>
              <div className="space-y-4">
                {results.spammsg.map((msg, i) => (
                  <div key={i} className="p-4 border border-red-200 rounded-md">
                    <p className="font-semibold text-red-800">{msg.subject}</p>
                    <p className="text-sm mt-1">{msg.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Select a discussion style to begin.</p>
        </div>
      )}
    </>
  );
};

export default Spam;
