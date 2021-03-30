import { useSnackbar } from "notistack";

interface Props {
  text?: string;
  children?: JSX.Element | string;
}


function Copy(props: Props) {
  const { text, children } = props;
  const { enqueueSnackbar } = useSnackbar();

  async function copytext(test: string) {
    await navigator.clipboard.writeText(test);
    enqueueSnackbar(test + " 已经被复制到剪贴板", {
      variant: 'success',
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  }

  return (
    <div
      onClick={() => {
        text && copytext(text);
      }}
    >
      {children}
    </div>
  );
}

export default Copy;
