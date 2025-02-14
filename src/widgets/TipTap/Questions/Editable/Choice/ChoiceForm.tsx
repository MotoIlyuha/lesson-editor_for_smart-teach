import {Button, Form, Radio, Switch, Flex} from "antd";
import {Cascader, InputNumber} from "@ant-design/pro-editor";
import {Question} from "../../../../../shared/types/LessonType.ts";
import {EditKnowledge} from "../../../../KnowledgeSelector/Edit/EditKnowledge.tsx";

interface ChoiceFormProps {
    question: Question
    updateAttributes: (question: Question) => void
    setWelcomeText: (welcomeText: string) => void
    setRandomSequence: (randomSequence: boolean) => void
    cost: number
    setCost: (cost: number) => void
    setIsEditing: (isEditing: boolean) => void
    knowledge: string[]
    setKnowledge: (knowledge: string[]) => void
}

export function ChoiceForm({
                               question,
                               updateAttributes,
                               setWelcomeText,
                               setRandomSequence,
                               cost,
                               setCost,
                               setIsEditing,
                               knowledge,
                               setKnowledge
                           }: ChoiceFormProps) {

    const onFinish = (question: Question) => {
        console.log('edited question', question);
        updateAttributes(question);
        setIsEditing(false);
    }

    return (
        <Form
            onFinish={onFinish}
            initialValues={question}
            size={'small'}
            labelCol={{span: 6}}
            wrapperCol={{span: 18}}
            style={{userSelect: 'none'}}
        >
            <Form.Item
                name="type"
                label="Тип:"
                // layout="vertical"
                labelCol={{span: 3}}
                wrapperCol={{span: 21}}
            >
                <Radio.Group
                    size={"small"} buttonStyle={'solid'}
                    value={question.type}
                    onChange={(e) => {
                        question.type = e.target.value
                        const newWelcomeText = e.target.value === "mono" ? "Выберите один вариант:" : "Выберите несколько вариантов:";
                        question.welcome_text = newWelcomeText;
                        setWelcomeText(newWelcomeText);
                    }}
                >
                    <Radio.Button value={'mono'}>Один вариант</Radio.Button>
                    <Radio.Button value={'multi'}>Несколько вариантов</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="cost"
                label="Баллов за решение"
                labelCol={{span: 12}}
                wrapperCol={{span: 8}}
            >
                <InputNumber defaultValue={question.cost} value={cost}
                             min={0} max={15} addonAfter={'Б'}
                             onStep={(value) => {
                                 setCost(Number(value));
                                 question.cost = Number(value);
                             }}
                             onChange={(value) => {
                                 setCost(Number(value));
                                 question.cost = Number(value);
                             }}/>
            </Form.Item>

            {question.type !== 'mono' &&
                <Form.Item
                    name="incomplete_score"
                    label="Разрешить неполный балл"
                >
                    <Switch checked={question.incomplete_score} onChange={(checked) => {
                        question.random = checked
                    }}/>
                </Form.Item>}

            <Form.Item
                name="random"
                label={'Случайный порядок'}
                labelCol={{span: 12}}
                wrapperCol={{span: 8}}
            >
                <Switch checked={question.random} onChange={(checked) => {
                    setRandomSequence(checked);
                    question.random = checked
                }}/>
            </Form.Item>

            <Form.Item
                name="knowledge"
                label="Знания"
            >
                <EditKnowledge defaultValue={knowledge} knowledge={knowledge} setKnowledge={setKnowledge}/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8}} labelCol={{span: 8}}>
                <Flex gap={8}>
                    <Button type="default" onClick={() => setIsEditing(false)}>Отмена</Button>
                    <Button type="primary" htmlType="submit">Сохранить</Button>
                </Flex>
            </Form.Item>

        </Form>
    )
}