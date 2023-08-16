import ReactPlayer from "react-player";
import {useAppSelector} from "../store";
import {useDispatch} from "react-redux";
import {next} from "../store/slices/player.ts";

export function Video() {
  const dispatch = useDispatch();

  const lesson = useAppSelector( state => {
    const {currentModuleIndex, currentLessonIndex} = state.playerReducer
    const currentLesson = state.playerReducer.course.modules[currentModuleIndex].lessons[currentLessonIndex]

    return currentLesson
  })

  const handlePlayNext = () => {
    dispatch(next())
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        playing
        onEnded={handlePlayNext}
        url={`https://www.youtube.com/watch?v=${lesson.id}`}
      />
    </div>
  )
}