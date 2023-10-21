"use client";

import { Send, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "./ChatContext";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Locale } from "../../../i18n.config";
interface ChatInputProps {
  isDisabled?: boolean;
  fileId?: string;
  dictionary: any;
  lang: Locale
}

const ChatInput = ({ isDisabled, fileId, dictionary, lang }: ChatInputProps) => {
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(ChatContext);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showAITips, setShowAITips] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);

  const { mutate: getQuestions } = useMutation({
    mutationFn: async ({ fileId }: { fileId: string }) => {
      try {
        const response = await fetch("/api/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileId, lang }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }
        const data = await response.json();

        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      setQuestions(data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  useEffect(() => {
    if (fileId) {
      getQuestions({ fileId: fileId! })
    }
  }, []);


  const selectQuestion = (selectedQuestion: string, lang: Locale) => {
  
    addMessage(selectedQuestion, lang);
    setShowAITips(false)
  };

  return (
    <div className="absolute bottom-0 left-0 w-full">
      {questions.length > 0 && (
       <div
        className={`flex flex-col gap-2 shadow-lg cursor-pointer ${
          showAITips ? "h-full block" : "h-[0px] hidden"
        } overflow-hidden transition-all bg-white p-5 paper`}
      >
        <div className="text-black font-bold flex flex-row gap-2">
          {dictionary.notSureWhatToAsk}{" "}
          <Lightbulb className="w-5 h-5 text-yellow-600" />
        </div>
        {questions.map((question, index) => {
          return (
            <Button
              key={index}
              className="w-full text-slate-500 bg-white-200 hover:bg-slate-100 transition-all p-3 opacity-100 border-1 border-b-slate-200"
              onClick={() => selectQuestion(question, lang)}
            >
              {question.replace(/['"]+/g, '')}
            </Button>
          );
        })}
      </div>
      )}

      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <div className="relative">
              {questions.length > 0 && (  
              <Button
                variant="ghost"
                className={cn(
                  showAITips ? "text-violet-400 bg-accent" : "text-black",
                  "absolute bottom-1.5 left-[8px]  hover:text-violet-400"
                )}
                onClick={() => setShowAITips(!showAITips)}
                disabled={isLoading || isDisabled}
              >
                <Sparkles className="w-5 h-5" />
              </Button>
              )}
              <Textarea
                rows={1}
                ref={textareaRef}
                maxRows={4}
                autoFocus
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addMessage(textareaRef.current?.value || "", lang);
                   
                    textareaRef.current?.focus();
      
                      if (textareaRef.current) {
                        textareaRef.current.value = '';
                        setShowAITips(false)
                      }
                  }
                }}
                disabled={isLoading || isDisabled}
                placeholder={dictionary.askYourPdfGenius}
                className={
                  cn(
                    questions.length > 0 ? "pl-[65px]" : "pl-[10px]",
                    "resize-none  pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                  )
                }/>

              <Button
                disabled={isLoading || isDisabled}
                className="absolute bottom-1.5 right-[8px]"
                aria-label="send message"
                onClick={() => {
                  addMessage(textareaRef.current?.value || "", lang);
                
                  textareaRef.current?.focus();
                  
                    if (textareaRef.current) {
                      textareaRef.current.value = '';
                      setShowAITips(false)
                    }
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
