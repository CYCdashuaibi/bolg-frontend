import { useNavigate } from "react-router-dom";

import { PublishSuccessStyle } from "./style";

import SuccessImg from '@/assets/images/success.svg'

const PublishSuccess = () => {
	window.document.title = "发布成功";
	const navigate = useNavigate();

	return (
		<PublishSuccessStyle>
			<div className="container cyc_card">
                <img src={SuccessImg} className="success-img" />
				<div className="desc">发布成功！感谢你的分享！</div>
				<button
					onClick={() => navigate("/cyc/home", { replace: true })}
					className="go-home"
				>
					回到首页
				</button>
			</div>
		</PublishSuccessStyle>
	);
};

export default PublishSuccess;
