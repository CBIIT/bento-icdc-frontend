import React from 'react';
// import { saveAs } from 'file-saver';
// import MarkdownPDF from "markdown-pdf";
// import CloseIcon from "@material-ui/icons/Close";
// import { pdf } from '@react-pdf/renderer';
import ReactMarkdown from 'react-markdown';
import { marked } from 'marked';
import html2pdf from 'html2pdf.js';
// import PdfTemplate from './ReadMePdf';
import CustomTheme from './ReadMe.theme.config';
import footerLine from './assets/footer_line.png';
import nihLogo from './assets/icdc_nih_logo.png';
import { createFileName } from '../../pages/Cart/utils';
import PdfDownloadIcon from './assets/Download_PDF.svg';
import {
  TitleContent,
  Title,
  DialogActionContent,
  DownloadButton,
  DownloadIcon,
  ClosButton,
  CloseBtnIcon,
  ReadMeContentContainer,
  DialogBox,
} from './ReadMe.styled';

const date = new Date().toLocaleString('en-us', {
  month: 'long',
  year: 'numeric',
  day: 'numeric',
});

/** download pdf of marked down file
 * 1.convert or generate html element of marked object
 * 2. uses html2pdf library to convert html to pdf
 * all the html style from marked down file will be reflected on PDF
 */
export const downloadMarkdownPdf = async (title, content) => {
  const html = marked(content);
  const htmlWithPageBreaks = html.replace(
    /<!-- PAGE BREAK -->/g,
    '<div class="page-break"></div>'
  );
  /** create html elment for pdf - convert marked object to html */
  const readMeContent = document.createElement('div');
  /** add header logo on first page */
  const headerLogo = `<img src='${nihLogo}' height="50px" width="400px"  alt='logo' />
  <br> <hr style="height:3px" color="#173554" />`;
  readMeContent.innerHTML += headerLogo;
  const titleEl =
    "<br><span style='color: #4D6787; font-size: 23px; font-family: Nunito Light'>".concat(
      title,
      '</span>'
    );
  readMeContent.innerHTML += titleEl;
  readMeContent.innerHTML += htmlWithPageBreaks;

  /** set pdf fileneame */
  const fileName = createFileName('ICDC-MY-FILES-CART-README', 'pdf');
  /** configure pdf increase pixel of the PDF */
  const options = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      dpi: 192,
      scale: 4,
      letterRendering: true,
      useCORS: true,
    },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
    },
  };

  html2pdf()
    .set(options)
    .from(readMeContent)
    .toPdf()
    .get('pdf')
    .then(pdf => {
      const totalPages = pdf.internal.getNumberOfPages();
      const pageSz = pdf.internal.pageSize;
      const pgHeight = pageSz.getHeight();
      const pgWidth = pageSz.getWidth();

      /** set header and footer content for each pdf page
       * page height and width is used for assigning header and footer element
       * adjust height & width for footer
       * adjust height & width for header
       */
      for (let i = 1; i <= totalPages; i += 1) {
        pdf.setPage(i);
        pdf.setFont('Source Sans Pro,sans-serif');
        pdf.setFontSize(8);
        pdf.setTextColor(0);
        pdf.text(pgWidth - 2.3, pgHeight - 0.5, `${date}     |      ${i}`);
        pdf.text(
          pgWidth - 8,
          pgHeight - 0.5,
          'CANINECOMMONS.CANCER.GOV/#/FileCentricCart'
        );
        pdf.addImage(
          footerLine,
          'JPEG',
          pgWidth - 8,
          pgHeight - 0.75,
          7.5,
          0.05
        );
        // if (i === 1) {
        // pdf.addImage(nihLogo, 'JPEG', pgWidth - 7.75, pgHeight - 10.75, 4, 0.5);
        // pdf.addImage(footerLine, 'JPEG', pgWidth - 7.75, pgHeight - 10.15, 7, 0.05);
        // }
      }
    })
    .save();
};

const ReadMeDialogComponent = ({
  display,
  displayReadMeDialog,
  content,
  title,
}) => {
  if (!content) {
    return <></>;
  }

  return (
    <CustomTheme>
      <DialogBox open={display} onClose={displayReadMeDialog} maxWidth="md">
        <TitleContent>
          <Title>
            <span>{title}</span>
          </Title>
          <DialogActionContent>
            <DownloadButton onClick={() => downloadMarkdownPdf(title, content)}>
              <DownloadIcon src={PdfDownloadIcon} alt="pdf download icon" />
            </DownloadButton>
            <ClosButton onClick={displayReadMeDialog}>
              <CloseBtnIcon fontSize="small" />
            </ClosButton>
          </DialogActionContent>
        </TitleContent>
        <ReadMeContentContainer id="readMe_content">
          <ReactMarkdown
            components={{
              a: ({ ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
            }}
          >
            {content.replace(/<!-- PAGE BREAK -->/g, '')}
          </ReactMarkdown>
        </ReadMeContentContainer>
      </DialogBox>
    </CustomTheme>
  );
};

export default ReadMeDialogComponent;
