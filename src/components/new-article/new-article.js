import React from 'react';
// import classes from '../form/form.module.scss';
import {
  useForm, useFieldArray,
} from 'react-hook-form';
import { Button } from '@mui/material';
import cn from 'classnames';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArticleContainer } from '../article-container/article-container';
import classes from './new-article.module.scss';
import { fetchCreateArticle } from '../../redux/asyncAction';


const NewArticle = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const counter = useSelector(state => state);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const params = useParams();
  console.log(params.slug);

  let defaultArticle = { tagList: [] };

  if (params.slug) {
    const [needArticle] = counter.arrArticles.filter(item => item.slug === params.slug);
    console.log(needArticle);
    defaultArticle = {
      article: {
        title: needArticle.title,
        description: needArticle.description,
        body: needArticle.body,
      },
      tagList: [5, 8, 12],
    };
  }

  const { register, control, handleSubmit } = useForm({
    defaultValues: defaultArticle,
  });
  const {
    fields,
    remove,
    append,
  } = useFieldArray({
    control,
    name: 'tagList',
  });


  const onSubmit = (data) => {
    console.log(data);
    console.log(data.tagList);
    console.log(data.tagList.body);
    // console.log(data.task);
    // console.log(data.tagList.ht);
    // eslint-disable-next-line no-param-reassign
    data = Object.assign(data.article, { tagList: data.tagList.hp, body: data.tagList.body });
    console.log(data);
    dispatch(fetchCreateArticle(data, counter, history));
  };

  if (isLoggedIn) {
    return (
      <ArticleContainer>
        <h1 className={classes.titleNewArticle}>Create new article</h1>
        <form className={classes.formBlog} onSubmit={handleSubmit(onSubmit)}>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label>
            Title
            <input
              // className={cn(errors?.['Email address'] && classes.error)}
              type="text"
              placeholder="Title"
              {...register('article.title')}
            />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label>
            Short description
            <input
              // className={cn(errors?.Password && classes.error)}
              type="text"
              placeholder="Title"
              {...register('article.description')}
            />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label>
            Text
            <textarea
              type="text"
              placeholder="Text"
              {...register('tagList.body')}
            />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label>
            Tags
            <ul>
              {fields.map((item, index) => (
                <li key={item.id}>
                  {console.log(item)}
                  <input defaultValue={defaultArticle.tagList[index]} placeholder="Tag" className={classes.inputTags} {...register(`tagList.hp[${index}]`)} />
                  {index > 0
                    ? (
                      <Button
                        className={cn(classes.button, classes.buttonDel)}
                        type="button"
                        onClick={() => remove(index)}
                      >
                    Delete
                      </Button>
                    ) : null}
                </li>
              ))}
              <Button
                className={cn(classes.button, classes.buttonAdd)}
                type="button"
                onClick={() => {
                  append({});
                }}
              >
                Add tag
              </Button>
            </ul>
          </label>
          <input className={classes.submitButton} value="Save" type="submit" />
        </form>
      </ArticleContainer>
    );
  }
  return <Redirect to="/articles" />;
};

export default NewArticle;
