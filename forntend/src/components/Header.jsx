const Header = ({ text, bg, count }) => {
    return (
        <div>
            <h2 className={`${bg} flex items-center h-12 pl-4 rounded-md text-sm text-white uppercase`}>{text}
                <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>
                    {count}</div></h2>
        </div >
    )
}

export default Header