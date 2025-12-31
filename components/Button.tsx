interface buttonProps{
    text:string
}

export default function Button({text}:buttonProps){
    return (
        <div>
            <div>
                <button className="w-full md:w-auto float-right bg-blue-600 hover:bg-blue-400 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg shadow-orange-200 active:scale-95">
                        {text}
                </button>
            </div>
        </div>
    )
}