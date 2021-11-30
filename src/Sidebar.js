import Tooltip from "@mui/material/Tooltip";
import DownloadIcon from "@mui/icons-material/Download";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TranslateIcon from "@mui/icons-material/Translate";
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from "@mui/material/IconButton";

const Sidebar = ({ 
  gameOver,
  japanese,
  setJapanese,
  added,
  show,
  hide,
  reveal,
  removeFromList,
  addToList,
  download,
  logout
}) => {
  return (
    <div className="sidebar">
      <div>
        {!gameOver && japanese && (
          <Tooltip title="Answer in Romaji" placement="right">
            <IconButton
              color="primary"
              size="large"
              onClick={() => setJapanese((prev) => !prev)}
            >
              <TranslateIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}
        {!gameOver && !japanese && (
          <Tooltip title="Answer in Kana" placement="right">
            <IconButton
              color="primary"
              size="large"
              onClick={() => setJapanese((prev) => !prev)}
            >
              <TranslateIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}
        {!gameOver && show && (
          <Tooltip title="Hide Answer" placement="right">
            <IconButton color="primary" size="large" onClick={hide}>
              <VisibilityOffIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}
        {!gameOver && !show && (
          <Tooltip title="Show Answer" placement="right">
            <IconButton color="primary" size="large" onClick={reveal}>
              <VisibilityIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}
        {!gameOver && added && (
          <Tooltip title="Remove from List" placement="right">
            <IconButton color="primary" size="large" onClick={removeFromList}>
              <AddCircleIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}
        {!gameOver && !added && (
          <Tooltip title="Add to List" placement="right">
            <IconButton color="primary" size="large" onClick={addToList}>
              <AddCircleOutlineIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Download List" placement="right">
          <IconButton color="primary" size="large" onClick={download}>
            <DownloadIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Log Out" placement="right">
          <IconButton color="primary" size="large" onClick={logout}>
            <LogoutIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
