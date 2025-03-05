import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { type FC, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import LoadingDark from '@/assets/loading-dark.svg?react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export const PdfViewer: FC<{ src: string; className?: string }> = ({
  src,
  className,
}) => {
  const [numPages, setNumPages] = useState<number>();

  const documentRef = useRef<HTMLDivElement | null>(null);

  const [pageSize, setPageSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setPageSize({
      width: documentRef.current?.getBoundingClientRect().width || 0,
      height: documentRef.current?.getBoundingClientRect().height || 0,
    });
  }, []);

  return (
    <Document
      options={options}
      inputRef={(ref) => {
        documentRef.current = ref;
      }}
      file={src}
      className={className}
      loading={
        <div className="flex h-screen w-screen items-center justify-center">
          <LoadingDark className="aspect-square w-8 animate-spin dark:invert-100" />
        </div>
      }
      onLoadSuccess={({ numPages }) => {
        setNumPages(numPages);
      }}
    >
      {Array.from(new Array(numPages), (_, i) => (
        <Page
          key={i + 1}
          pageNumber={i + 1}
          width={pageSize.width}
          height={pageSize.height}
        />
      ))}
    </Document>
  );
};
