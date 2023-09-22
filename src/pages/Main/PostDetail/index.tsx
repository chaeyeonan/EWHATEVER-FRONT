import { Column, EntireContainer, Row } from 'assets/common';
import { Header } from 'components/common/Header';
import Homebar from 'components/common/Homebar';
import CardSlider, { MakeCardSlider } from 'components/common/CardSlider';
import { Palette } from 'styles/Palette';
import { useParams } from 'react-router';
import CommentScrapInfo from 'components/PostDetail/CommentScrapInfo';
import ScrapButton from 'components/PostDetail/ScrapButton';
import CommentsBox from 'components/PostDetail/CommentsBox';
import CommentInputBox from 'components/PostDetail/CommentInputBox';
import { useEffect, useState } from 'react';
import { QTitleCard, QContentCard, AnsCard } from 'components/common/Card';
import { postsDetailApi } from 'network/postsApi';
import { postType, commentType } from 'types';

const PostDetail = () => {
  const { idx } = useParams();
  const idxNum = idx ? parseInt(idx) : null;

  const [postdetail, setPostdetail] = useState<postType | null>(null);
  const [currentComments, setCurrentComments] = useState<commentType[] | null>(
    null,
  );
  const [cards, setCards] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    console.log(idxNum);
    const fetchData = async () => {
      try {
        if (idxNum !== null) {
          const res = await postsDetailApi(idxNum);
          setPostdetail(res);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [idxNum]);

  return (
    <Column>
      <Header btn={'back'} borderBottom={true}>
        {''}
      </Header>
      {cards && (
        <EntireContainer color={Palette.Gray05}>
          {postdetail !== null ? (
            <Column gap={23}>
              <CardSlider cards={MakeCardSlider(postdetail)} />
              <Row justifyContent="space-between">
                <CommentScrapInfo post={postdetail}></CommentScrapInfo>
                <ScrapButton></ScrapButton>
              </Row>
              {/* <CommentsBox comments={comments}></CommentsBox> */}
            </Column>
          ) : (
            <div>loading...</div>
          )}
        </EntireContainer>
      )}
      <CommentInputBox />
    </Column>
  );
};

export default PostDetail;
