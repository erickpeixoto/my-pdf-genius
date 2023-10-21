"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { Cloud, File, Loader2, Plus } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "./ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { getSizePlanByName } from "@/lib/utils";
import { Plans } from "@/lib/types";
import { Progress } from "@nextui-org/react";

export type DictionaryProps = {
  title: string;
  description: string;
  loading: string;
  uploadButton: {
    title: string
    fileType: string
    uploading: string
    redirecting: string
    errorTitle: string
    errorDescription: string
    variantDestructive: string
    uploadPDF: string
  }
}


type UploadDropzoneProps = {
  planName: Plans;
  dictionary: DictionaryProps;
};
const UploadDropzone = ({ planName, dictionary }: UploadDropzoneProps) => {
  const router = useRouter();

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { toast } = useToast();

  const { startUpload } = useUploadThing(
    planName === "explorer"
      ? "explorerUploader"
      : planName === "champion"
      ? "championUploader"
      : "eliteUploader"
  );

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);

        const progressInterval = startSimulatedProgress();

        // handle file uploading
        const res = await startUpload(acceptedFile);

        if (!res) {
          return toast({
            title: dictionary.uploadButton.errorTitle,
            description: dictionary.uploadButton.errorDescription,
            variant: "destructive",
          });
        }

        const [fileResponse] = res;

        const key = fileResponse?.key;

        if (!key) {
          return toast({
            title: dictionary.uploadButton.errorTitle,
            description: dictionary.uploadButton.errorDescription,
            variant: "destructive",
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);

        startPolling({ key });
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"
        >
          <div className="flex items-center justify-center h-full w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                <p className="mb-2 text-sm text-zinc-700">
                  <span className="font-semibold">{dictionary.uploadButton.title} </span>
                  
                </p>
                <p className="text-xs text-zinc-500">
                  PDF (up to {getSizePlanByName(planName)} MB)
                </p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                  <div className="px-3 py-2 h-full grid place-items-center">
                    <File className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="px-3 py-2 h-full text-sm truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="w-full mt-4 max-w-xs mx-auto">
                  <Progress
                    aria-label={dictionary.uploadButton.uploading }
                    size="md"
                    value={uploadProgress}
                    color="primary"
                    showValueLabel={true}
                    className="max-w-md"
                  />
                  {uploadProgress === 100 ? (
                    <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      {dictionary.uploadButton.redirecting}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input {...getInputProps()} type="file" className="hidden" />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

const UploadButton = ({
  planName,
  isCanceled,
  dictionary,
}: {
  planName: Plans;
  isCanceled: boolean;
  dictionary: DictionaryProps;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleModal = () => {
    if (!planName) {
      router.push("/pricing");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={handleModal} asChild>
        <Button
          disabled={isCanceled}
          className="md:absolute p-7 md:w-[180px] md:ml-[370px] bg-gradient-to-r from-sky-500 to-indigo-500"
        >
          <Plus /> {dictionary.uploadButton.uploadPDF}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <UploadDropzone planName={planName} dictionary={dictionary} />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
