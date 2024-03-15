import {
  House,
  MusicNotes,
  MicrophoneStage,
  MusicNotesPlus,
} from "@phosphor-icons/react";
import IconLink from "./IconLink";

function Navbar() {
  return (
    <header className="bg-blackfy flex items-center justify-between p-4 fixed w-full bottom-0">
      <IconLink redirect="/" title="Home">
        <House size={24} weight="fill" />
      </IconLink>
      <IconLink redirect="/TopTracks" title="Top Tracks">
        <MusicNotes size={24} weight="fill" />
      </IconLink>
      <IconLink redirect="/TopArtists" title="Top Artists">
        <MicrophoneStage size={24} weight="fill" />
      </IconLink>
      <IconLink redirect="/Discover" title="Discover">
        <MusicNotesPlus size={24} weight="fill" />
      </IconLink>
    </header>
  );
}



export default Navbar;
