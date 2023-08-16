import { MessageCircle} from "lucide-react";
import {Header} from "../components/Header.tsx";
import {Video} from "../components/Video.tsx";
import {Module} from "../components/Module.tsx";
import {useAppSelector} from "../store";
import {start, useCurrentLesson} from "../store/slices/player.ts";
import {useEffect} from "react";
import {api} from "../lib/axios.ts";
import {useDispatch} from "react-redux";

export function Player() {
  const dispatch = useDispatch()

  // exemplo de nome
  // const modules = useAppSelector(store => store.playerReducer.course.modules)

  //**= outras formas de fazer o retorno dos modulos - sempre retorna apenas as informacoes que eu quero, apenas 1 slice, pra evitar renderizações desnecessarias
   const modules = useAppSelector(state => state.playerReducer.course?.modules)

  // const modules = useAppSelector(state => {
  //   return state.playerReducer.course.modules
  // })

  // const { modules, x} = useAppSelector(state => {
  //   const modules = state.playerReducer.course.modules
  //   const x = 1
  //
  //   return {modules, x}
  // })
  //**= fim formas de retorno

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    api.get('/courses/1').then(response => {
      dispatch(start(response.data))
    })
  }, [])

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`
    }
  }, [currentLesson])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />


          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="h-4 w-4" />
            Deixar feedback
          </button>
        </div>


        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            { modules && modules.map((module, index) =>  {
              return (
                <Module
                  key={module.id}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                  moduleIndex={index}
                />
              )
            })}
          </aside>
        </main>
      </div>
    </div>
  )
}