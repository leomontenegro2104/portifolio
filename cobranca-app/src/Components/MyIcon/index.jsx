import './styles.css';

export default function MyIcon({ iconImg, iconName }) {
    return (
        <>
            <img className="MyIcon" src={iconImg} alt={iconName} />
        </>
    )
}