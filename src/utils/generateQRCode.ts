import QRCode from "qrcode";

type Props = {
  token: string;
};

export const generateQRCode = ({ token }: Props)  => {
  const urlQRCode = "http://localhost:3000/invitationDetail/";

  QRCode.toDataURL(
    token,
    {
      width: 800,
      margin: 2,
      color: {
        dark: "#000000FF",
        light: "#EEEEEEFF",
      },
    },
    (err: any, url: any) => {
      if (err) {
        console.error(err)
        return err+"";
      }
      //   console.log(url);
      return urlQRCode + url;
    }
  );
};
