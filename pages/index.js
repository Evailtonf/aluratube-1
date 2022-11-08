import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu  from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";


const HomePage = () => {
    // const estiloDaHomePage = { 
    //     //backgroundColor: "red" 
    // };
    //console.log(config.playlists);
    return (
        <>
            <CSSReset />
            <div>
                <Menu />
                <Header banner={config.banner}/>
                <Timeline playlists={config.playlists} favoritos={config.favoritos} />
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
    .banner-alura-tube{
        width: 100%;
        height: 230px;
        object-fit:cover;
        object-position: center;
    }
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

const Header = (props) => {
    return (
        <StyledHeader>
            <img className="banner-alura-tube" src={props.banner} alt="Banner AluraTube"/>
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

const Timeline = (props) => {
    const playlistName = Object.keys(props.playlists);
    const favoritosName = Object.keys(props.favoritos);
    //Statment
    //Retorno por expressão
    return (
        <StyledTimeline>
            {playlistName.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div className="video-card" >
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
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
                return(
                    <section>
                        <h2>{favoritosName}</h2>
                        <div className="favorite-card">
                            {favoriteInfluences.map((favoriteInfluences) => {
                                return(
                                    <a  href={`https://github.com/${favoriteInfluences.perfilgithub}`}>
                                        <img className="photo-alurafavoritos" src={`https://github.com/${favoriteInfluences.perfilgithub}.png`}/>
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