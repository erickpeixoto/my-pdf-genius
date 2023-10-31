import { cn } from "@/lib/utils";
import { ExtendedMessage } from "@/types/message";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { forwardRef } from "react";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "lucide-react";
interface MessageProps {
  message: ExtendedMessage;
  isNextMessageSamePerson: boolean;
  picture: string;
}

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, isNextMessageSamePerson, picture }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-end", {
          "justify-end": message.isUserMessage,
        })}
      >
        <div
          className={cn("relative flex w-10 items-center justify-center z-0", {
            "order-2 rounded-sm": message.isUserMessage,
            "order-1  rounded-sm": !message.isUserMessage,
            invisible: isNextMessageSamePerson,
          })}
        >
          {message.isUserMessage ? (
            <Avatar src={picture} />
          ) : (
            <Image src="/ico.png" alt="logo" width={50} height={53} />
          )}
        </div>

        <div
          className={cn("flex flex-col space-y-2 text-base max-w-md mx-2", {
            "order-1 items-end": message.isUserMessage,
            "order-2 items-start": !message.isUserMessage,
          })}
        >
          <div
            className={cn("px-4 py-2 rounded-lg inline-block", {
              "bg-gradient-to-r from-sky-500 to-indigo-500 text-white":
                message.isUserMessage,
              "bg-gray-200 text-gray-900": !message.isUserMessage,
              "rounded-br-none":
                !isNextMessageSamePerson && message.isUserMessage,
              "rounded-bl-none":
                !isNextMessageSamePerson && !message.isUserMessage,
            })}
          >
            <CopyToClipboard text={message.text as string}>
              <span>
                {message.id !== "loading-message" && (
                   <Copy
                   className={
                     cn("w-4 h-4 cursor-pointer float-right", {
                       "text-zinc-50 hover:text-white transition duration-300 ease-in-out": message.isUserMessage,
                       "text-gray-500 hover:text-blue-500 transition duration-300 ease-in-out": !message.isUserMessage,
                     })
                   }
                 />

                )}
               
                {typeof message.text === "string" ? (
                  <ReactMarkdown
                    className={cn("prose", {
                      "text-zinc-50": message.isUserMessage,
                    })}
                  >
                    {message.text}
                  </ReactMarkdown>
                ) : (
                  message.text
                )}
                {message.id !== "loading-message" ? (
                  <div
                    className={cn(
                      "text-xs select-none mt-2 w-full text-right",
                      {
                        "text-zinc-500": !message.isUserMessage,
                        "text-blue-300": message.isUserMessage,
                      }
                    )}
                  >
                    {format(new Date(message.createdAt), "HH:mm")}
                  </div>
                ) : null}
              </span>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  }
);

Message.displayName = "Message";

export default Message;
