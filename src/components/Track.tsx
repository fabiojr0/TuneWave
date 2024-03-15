function Track({infos}: {infos: Track}) {
    return (
        <div>
            <img src={infos.images[0].url} alt={infos.name} />
            <p>{infos.name}</p>
        </div>
    )
}

export default Track
