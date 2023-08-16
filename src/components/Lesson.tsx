import {Video} from "lucide-react";
// import {useDispatch} from "react-redux";
// import {play} from "../store/slices/player.ts";

interface LessonProps {
  title: string,
  duration: string,
  onPlay: () => void,
}

export function Lesson({duration, title, onPlay}: LessonProps) {
  // ==*** removido para usar o onPlay no lugar
  // const dispatch = useDispatch()
  //
  // const handlePlayLesson = () => {
  //   dispatch(play());
  // }

  return (
    <button
      onClick={onPlay}
      className="flex items-center gap-3 text-sm text-zinc-400"
    >
      <Video className="w-4 h-4 text-zinc-500" />
      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">{duration}</span>
    </button>
  )
}