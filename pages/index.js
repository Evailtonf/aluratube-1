import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";


const HomePage = () => {
    // const estiloDaHomePage = { 
    //     //backgroundColor: "red" 
    // };
    //console.log(config.playlists);
    const [valorDoFiltro, setvalorDoFiltro] = React.useState("");
    //const valorDoFiltro = "perfeita";
    return (
        <>
            <CSSReset />
            <div>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setvalorDoFiltro={setvalorDoFiltro} />
                <Header banner={config.banner} />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} favoritos={config.favoritos} />
            </div>
        </>
    );
};
export default HomePage;

// const Menu = () => {
//     return (
//         <div>
//             Menu
//         </div>
//     );
// };

const StyledHeader = styled.div`
    /* .banner-alura-tube{
        width: 100%;
        height: 230px;
        object-fit:cover;
        object-position: center;
    } */
    .foto-perfil{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info{
        width: 100%;
        display: flex;
        align-items: center;
        padding: 16px 32px;
        gap: 16px;
    }
`;

// const StyledBannerAluraTube = styled.img`
//     width: 100%;
//     height: 230px;
//     object-fit:cover;
//     object-position: center;
// `;

const StyledBannerAluraTube = styled.div`
    height: 230px;
    background-color: purple;
    background-image: url(${ ( { bg } ) => bg });
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

const Header = (props) => {
    return (
        <StyledHeader>
            {/* <img className="banner-alura-tube" src={props.banner} alt="Banner AluraTube" /> */}
            {/* <StyledBannerAluraTube src={props.banner}/> */}
            <StyledBannerAluraTube bg={config.banner} />
            <section className="user-info">
                <img className="foto-perfil" src={`https://github.com/${config.github}.png`} alt="fotinha do perfil" />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    );
};

const Timeline = ({ searchValue, ...props }) => {
    const playlistName = Object.keys(props.playlists);
    const favoritosName = Object.keys(props.favoritos);
    //Statment
    //Retorno por expressão
    return (
        <StyledTimeline>
            {playlistName.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div className="video-card" >
                            {videos
                            .filter((video) => {
                                //logica Se o nome do vídeo contêm algo com esse trecho
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            })
                            .map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
            {favoritosName.map((favoritosName) => {
                const favoriteInfluences = props.favoritos[favoritosName]
                return (
                    <section key={favoritosName}>
                        <h2>{favoritosName}</h2>
                        <div className="favorite-card">
                            {favoriteInfluences.map((favoriteInfluences) => {
                                return (
                                    <a key={favoriteInfluences.perfilgithub} href={`https://github.com/${favoriteInfluences.perfilgithub}`}>
                                        <img className="photo-alurafavoritos" src={`https://github.com/${favoriteInfluences.perfilgithub}.png`} />
                                        <span>{`@${favoriteInfluences.perfilgithub}`}</span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    );
};