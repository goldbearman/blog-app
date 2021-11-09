import React from 'react';
// import classes from '../form/form.module.scss';
import {
  useForm, useFieldArray,
} from 'react-hook-form';
import { Button } from '@mui/material';
import cn from 'classnames';
// import { useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { ArticleContainer } from '../article-container/article-container';
import classes from './new-article.module.scss';
// import { fetchCreateArticle } from '../../redux/asyncAction';


const NewArticle = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const user = useSelector(state => state.user);

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      tagList: [],
    },
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
    // console.log(data.task);
    // console.log(data.tagList.ht);
    // eslint-disable-next-line no-param-reassign
    data = Object.assign(data.article, { tagList: data.tagList.hp, body: data.tagList.body });
    console.log(data);
    // dispatch(fetchCreateArticle(Object.assign(data.task, {}), user.token, history));
  };

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
                <input placeholder="Tag" className={classes.inputTags} {...register(`tagList.hp[${index}]`)} />

                {/* <Controller */}
                {/*  render={({ field }) => <input {...field} />} */}
                {/*  name={`test.${index}.lastName`} */}
                {/*  control={control} */}
                {/* /> */}
                <Button
                  className={cn(classes.button, classes.buttonDel)}
                  type="button"
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
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
};

export default NewArticle;
