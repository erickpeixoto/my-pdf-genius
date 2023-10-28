"use client";

import { trpc } from "@/app/_trpc/client";
import {
  Ghost,
  Loader2,
  MessageSquare,
  Calendar,
  Trash,
  FileBarChart,
  ShieldCheck,
  ShieldBan,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";
import { H } from "@highlight-run/next/client";
import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);

  const utils = trpc.useContext();
  const { user } = useUser();
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate({ id }) {
      setCurrentlyDeletingFile(id);
    },
    onSettled() {
      setCurrentlyDeletingFile(null);
    },
  });

  H.identify(user?.emailAddresses[0].emailAddress!, {
    id: user?.id!,
    avatar: user?.imageUrl!,
  });
  
  return (
    <main className="mx-auto max-w-7xl">
      {files && files?.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (
                a: { createdAt: string | number | Date },
                b: { createdAt: string | number | Date }
              ) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
              >
                <Link href={`/dashboard/${file.id}`} className="cursor-pointer">
                  <div className="pt-6 px-6 flex flex-row gap-2  w-full items-center justify-between space-x-6">
                    <FileBarChart className="h-5 w-5 text-gray-500 " />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-base font-medium text-zinc-900">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 mt-4 py-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-zinc-500">
                        Pages: {file.pagesAmt || "N/A"}
                      </p>
                      <p
                        className="text-sm text-zinc-500 flex gap-1"
                        title={file.uploadStatus}
                      >
                        Status:{" "}
                        {file.uploadStatus === "SUCCESS" ? (
                          <ShieldCheck className="h-4 w-4 text-green-600" />
                        ) : (
                          <ShieldBan className="h-4 w-4 text-red-500" />
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(file.createdAt), "MMM yyyy")}
                    </div>

                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      {file._count.messages}
                    </div>

                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        deleteFile({ id: file.id });
                      }}
                      size="sm"
                      className="w-full z-50"
                      variant="destructive"
                    >
                      {currentlyDeletingFile === file.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <div className=" pt-16">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-zinc-800" />
          <h3 className="font-semibold text-xl">Pretty empty around here</h3>
          <p>Lets upload your first PDF.</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
