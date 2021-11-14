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

  let defaultArticle = { objArticle: [{}] };

  if (params.slug) {
    console.log('if');
    const [needArticle] = counter.arrArticles.filter(item => item.slug === params.slug);
    console.log(needArticle);
    defaultArticle = {
      obj: {
        title: needArticle.title,
        description: needArticle.description,
        body: needArticle.body,
      },
      objArticle: [5, 8, 12],
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
    name: 'objArticle',
  });


  const onSubmit = (data) => {
    console.log(data);
    console.log(data.tagList);
    // console.log(data.task);
    // console.log(data.tagList.ht);
    // eslint-disable-next-line no-param-reassign
    data = Object.assign(data.obj, { tagList: data.objArticle.tagList });
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
              {...register('obj.title')}
            />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label>
            Short description
            <input
              // className={cn(errors?.Password && classes.error)}
              type="text"
              placeholder="Title"
              {...register('obj.description')}
            />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label>
            Text
            <textarea
              type="text"
              placeholder="Text"
              {...register('obj.body')}
            />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label>
            Tags
            <ul>
              {fields.map((item, index) => (
                <li key={item.id}>
                  {console.log(item)}
                  <input defaultValue={Object.keys(defaultArticle).length === 1 ? '' : defaultArticle.tagList[index]} placeholder="Tag" className={classes.inputTags} {...register(`objArticle.tagList[${index}]`)} />
                  {index > 0
                    // eslint-disable-next-line no-mixed-spaces-and-tabs,no-tabs
                    ? (
                      <Button
                        className={cn(classes.button, classes.buttonDel)}
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Delete
                      </Button>
                    ) : null}
                  <div className={classes.emptyDiv} />
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
