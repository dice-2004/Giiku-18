// type Params = {
//     params: { name: string }
//     searchParams: { [query: string]: string | string[] | undefined }
// }
    
// export default function streamerPage({ params, searchParams }: Params){
//     return (
//         <div>
//             <h1>
//                 {params.name} さんのチャンネルへようこそ！
//             </h1>
//             searchParams ? (
//                 <p>
//                     {searchParams.text}
//                 </p>
//             ) : ""    //クエリ指定がないとなにも表示されない
//         </div>
//     )    
// }

type Params = {
    params: { name: string }
    searchParams: { [query: string]: string | string[] | undefined }
}
    
const StreamerPage = async ({ params, searchParams }: Params) => {
    const { name } = await params;
    const { example1, example2, example3 } = await searchParams;

    return (
        <div>
            <h1>
                {`${decodeURIComponent(name)} さんのチャンネルへようこそ！`}
            </h1>
            {example1 && <p>{`${example1}${example2} ${example3}`}</p>}

        </div>
    )    
}

export default StreamerPage;